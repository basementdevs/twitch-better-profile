use std::sync::Arc;

use actix_web::{App, HttpServer};
use actix_web::web::Data;
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
    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(app_data.clone()))
            .service(http::messages_controller::post_submission)
            .service(http::settings_controller::put_settings)
            .service(http::settings_controller::get_settings)
    }).bind(addr)?.run().await
}
