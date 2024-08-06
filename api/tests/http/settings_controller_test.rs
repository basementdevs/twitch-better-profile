#[cfg(test)]
mod tests {
  use std::sync::Arc;

  use actix_web::web::Data;
  use actix_web::App;
  use charybdis::operations::{Delete, Insert};
  use twitch_extension_api::config::app::AppState;
  use twitch_extension_api::http::settings_controller::{get_settings, put_settings};
  use twitch_extension_api::models::settings::Settings;

  #[actix_web::test]
  async fn test_get_settings() {
    // Arrange
    let app_data = AppState::new().await;
    let database = Arc::clone(&app_data.database);

    let server = actix_test::start(move || {
      App::new()
        .app_data(Data::new(app_data.clone()))
        .service(get_settings)
    });

    let settings = Settings {
      user_id: 123,
      username: Some("danielhe4rt".to_string()),
      ..Default::default()
    };

    settings.insert().execute(&database).await.unwrap();

    // Act
    let uri = format!("/settings/{}", settings.username.clone().unwrap());
    let req = server.get(uri);
    let mut res = req.send().await.unwrap();
    let parsed_response: Settings = res.json().await.unwrap();

    // Assert

    assert_eq!(res.status().as_u16(), 200);
    assert_eq!(parsed_response.username, settings.username);

    settings.delete().execute(&database).await.unwrap();
  }

  #[actix_web::test]
  async fn test_put_settings() {
    // Arrange
    let app_data = AppState::new().await;
    let database = Arc::clone(&app_data.database);

    let server = actix_test::start(move || {
      App::new()
        .app_data(Data::new(app_data.clone()))
        .service(put_settings)
    });

    let mut settings = Settings {
      user_id: 123,
      username: Some("danielhe4rt".to_string()),
      pronouns: Some("she/her".to_string()),
      ..Default::default()
    };
    settings.insert().execute(&database).await.unwrap();

    settings.pronouns = Some("he/him".to_string());

    // Act
    let uri = "/settings".to_string();
    let req = server.put(uri);

    let mut res = req.send_json(&settings).await.unwrap();
    let parsed_response: Settings = res.json().await.unwrap();

    // Assert

    assert_eq!(res.status().as_u16(), 200);

    assert_eq!(parsed_response.username, settings.username);
    assert_eq!(parsed_response.pronouns, settings.pronouns);

    settings.delete().execute(&database).await.unwrap();
  }

  #[actix_web::test]
  async fn test_should_put_settings_in_right_format() {
    // Arrange
    let app_data = AppState::new().await;
    let database = Arc::clone(&app_data.database);

    let server = actix_test::start(move || {
      App::new()
        .app_data(Data::new(app_data.clone()))
        .service(put_settings)
    });

    let mut settings = Settings {
      user_id: 123,
      username: Some("danielhe4rt".to_string()),
      pronouns: Some("she/her".to_string()),
      ..Default::default()
    };
    settings.insert().execute(&database).await.unwrap();

    settings.pronouns = Some("he/hims".to_string());

    // Act
    let uri = "/settings".to_string();
    let req = server.put(uri);

    let res = req.send_json(&settings).await.unwrap();

    // Assert

    assert_eq!(res.status().as_u16(), 422);

    settings.delete().execute(&database).await.unwrap();
  }
}
