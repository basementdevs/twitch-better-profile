use std::fs::File;
use std::io::BufReader;
use std::sync::Arc;

use actix_web::{App, HttpServer};
use actix_web::web::Data;
use actix_cors::Cors;
use log::debug;

use crate::config::app::AppState;

mod config;
mod http;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().expect(".env file not found");
    colog::init();
    let app_data = AppState::new().await;

    let addr = (
        app_data.config.app.url.clone(),
        app_data.config.app.port.parse::<u16>().unwrap().clone()
    );
    debug!("Web Server Online!");

    rustls::crypto::aws_lc_rs::default_provider()
        .install_default()
        .unwrap();

    let cert_path = dotenvy::var("APP_AUTH_CERT").unwrap();
    let key_path = dotenvy::var("APP_AUTH_KEY").unwrap();

    let mut certs_file = BufReader::new(File::open(cert_path).unwrap());
    let mut key_file = BufReader::new(File::open(key_path).unwrap());

    // load TLS certs and key
    // to create a self-signed temporary cert for testing:
    // `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 -subj '/CN=localhost'`
    let tls_certs = rustls_pemfile::certs(&mut certs_file)
        .collect::<Result<Vec<_>, _>>()
        .unwrap();
    let tls_key = rustls_pemfile::pkcs8_private_keys(&mut key_file)
        .next()
        .unwrap()
        .unwrap();

    // set up TLS config options
    let tls_config = rustls::ServerConfig::builder()
        .with_no_client_auth()
        .with_single_cert(tls_certs, rustls::pki_types::PrivateKeyDer::Pkcs8(tls_key))
        .unwrap();

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .app_data(Data::new(app_data.clone()))
            .service(http::messages_controller::post_submission)
            .service(http::settings_controller::put_settings)
            .service(http::settings_controller::get_settings)
    }).bind_rustls_0_23(addr, tls_config)?.run().await
}
