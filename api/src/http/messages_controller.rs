use crate::config::app::AppState;
use crate::http::SomeError;
use crate::models::message::Message;
use actix_web::{post, web, HttpResponse, Responder};
use charybdis::operations::Insert;
use log::debug;
use serde_json::json;

#[post("/messages")]
pub async fn post_submission(
  data: web::Data<AppState>,
  message: web::Json<Message>,
) -> Result<impl Responder, SomeError> {
  let message = message.into_inner();
  message.insert().execute(&data.database).await?;

  debug!(
    "[{:?}] ({}) {}: {}",
    message.sent_at,
    message.channel_id.to_string(),
    message.username.to_string(),
    message.content.to_string()
  );

  Ok(HttpResponse::Ok().json(json!(message)))
}
