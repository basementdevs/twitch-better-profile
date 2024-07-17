use actix_web::{get, HttpResponse, post, put, Responder, web};
use charybdis::errors::CharybdisError;
use charybdis::operations::{Find, Insert};
use serde_json::json;
use web::Json;
use crate::config::app::AppState;
use crate::http::SomeError;
use crate::models::settings::{find_settings, Settings};

#[put("/settings")]
pub async fn put_settings(
    data: web::Data<AppState>,
    message: Json<Settings>,
) -> Result<impl Responder, SomeError> {
    let settings = message.into_inner();
    settings.insert().execute(&data.database).await?;

    Ok(HttpResponse::Ok().json(json!(settings)))
}

#[get("/settings/{user_id}")]
pub async fn get_settings(
    data: web::Data<AppState>,
    user_id: web::Path<i32>,
) -> Result<impl Responder, SomeError> {
    let settings = find_settings!( "user_id = ? PER PARTITION LIMIT 1;",(user_id.into_inner(),))
        .execute(&data.database)
        .await?;

    let settings = settings.try_collect().await?;

    let response = match settings.is_empty() {
        true => HttpResponse::NotFound().json(json!({})),
        false => HttpResponse::Ok().json(json!(settings[0].clone()))
    };

    Ok(response)
}