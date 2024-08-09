use actix_web::{get, put, web, HttpResponse, Responder};
use charybdis::operations::{Find, Insert};
use log::debug;
use serde_json::json;
use web::Json;

use crate::config::app::AppState;
use crate::http::SomeError;
use crate::models::materialized_views::settings_by_username::SettingsByUsername;
use crate::models::settings::Settings;

static AVAILABLE_PRONOUNS: &[&str] = &[
  "n/d",
  "he/him",
  "she/her",
  "they/them",
  "she/they",
  "he/they",
  "he/she",
  "xe/xem",
  "fae/faer",
  "ve/ver",
  "ae/aer",
  "zie/hir",
  "per/per",
  "e/em",
  "it/its",
];

#[put("/settings")]
pub async fn put_settings(
  data: web::Data<AppState>,
  message: Json<Settings>,
) -> anyhow::Result<impl Responder, SomeError> {
  let settings = message.into_inner();

  let pronouns = settings.pronouns.clone().unwrap().to_lowercase();
  if !AVAILABLE_PRONOUNS.contains(&pronouns.as_str()) {
    return Ok(HttpResponse::UnprocessableEntity().json(json!({
        "message": "pronoun not listed"
    })));
  }

  settings.insert().execute(&data.database).await?;

  Ok(HttpResponse::Ok().json(json!(settings)))
}

#[get("/settings/{username}")]
pub async fn get_settings(
  data: web::Data<AppState>,
  username: web::Path<String>,
) -> Result<impl Responder, SomeError> {
  let username = username.into_inner();

  let settings = SettingsByUsername {
    username,
    ..Default::default()
  };

  let settings = settings
    .find_by_partition_key()
    .execute(&data.database)
    .await?;

  let settings = settings.try_collect().await?;
  debug!("data: {:?}", settings.is_empty());
  let response = match settings.is_empty() {
    true => HttpResponse::NotFound().json(json!({})),
    false => HttpResponse::Ok().json(json!(settings[0].clone())),
  };

  Ok(response)
}
