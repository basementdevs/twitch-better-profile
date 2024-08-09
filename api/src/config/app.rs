use crate::config::Config;
use dotenvy::dotenv;
use scylla::{CachingSession, Session, SessionBuilder};
use std::sync::Arc;
use std::time::Duration;

#[derive(Debug, Clone)]
pub struct AppState {
  pub config: Config,
  pub database: Arc<CachingSession>,
}

impl AppState {
  pub async fn new() -> Self {
    dotenv().expect(".env file not found");

    let config = Config::new();
    let session: Session = SessionBuilder::new()
      .known_nodes(config.database.nodes)
      .connection_timeout(Duration::from_secs(5))
      .user(config.database.username, config.database.password)
      .build()
      .await
      .expect(
        "Connection Refused. Check your credentials and your IP linked on the ScyllaDB Cloud.",
      );

    session
      .use_keyspace(config.database.keyspace, false)
      .await
      .expect("Keyspace not found");

    AppState {
      config: Config::new(),
      database: Arc::new(CachingSession::from(
        session,
        config.database.cached_queries,
      )),
    }
  }
}
