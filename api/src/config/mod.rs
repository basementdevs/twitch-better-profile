pub mod app;

use serde::Serialize;

#[derive(Clone, Debug, Serialize)]
pub struct App {
    pub name: String,
    pub version: String,
    pub url: String,
    pub port: u16,
}
#[derive(Clone, Debug, Serialize)]
pub struct Database {
    pub nodes: Vec<String>,
    pub username: String,
    pub password: String,
    pub cached_queries: usize,
    pub keyspace: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Tls {
    pub enabled: bool,
    pub cert: String,
    pub key: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Config {
    pub app: App,
    pub tls: Tls,
    pub database: Database
}

impl Config {
    pub fn new() -> Self {
        Config {
            app: App {
                name: dotenvy::var("APP_NAME").unwrap(),
                version: dotenvy::var("APP_VERSION").unwrap(),
                url: dotenvy::var("APP_URL").unwrap(),
                port: dotenvy::var("APP_PORT").unwrap().parse::<u16>().unwrap(),
            },
            tls: Tls{
                enabled: dotenvy::var("APP_TLS_ENABLED").unwrap() == "true",
                cert: dotenvy::var("APP_TLS_CERT").unwrap(),
                key: dotenvy::var("APP_TLS_KEY").unwrap(),
            },
            database: Database {
                nodes: dotenvy::var("SCYLLA_NODES").unwrap().split(',').map(|s| s.to_string()).collect(),
                username: dotenvy::var("SCYLLA_USERNAME").unwrap(),
                password: dotenvy::var("SCYLLA_PASSWORD").unwrap(),
                cached_queries: dotenvy::var("SCYLLA_CACHED_QUERIES").unwrap().parse::<usize>().unwrap(),
                keyspace: dotenvy::var("SCYLLA_KEYSPACE").unwrap()
            }
        }
    }
}