use charybdis::macros::charybdis_view_model;
use charybdis::types::{Int, Text, Timestamp};
use serde::{Deserialize, Serialize};

#[charybdis_view_model(
    table_name=settings_by_username,
    base_table=settings,
    partition_keys=[username],
    clustering_keys=[user_id, updated_at],
    table_options = "
     CLUSTERING ORDER BY (updated_at DESC, user_id DESC)
    "
)]
#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct SettingsByUsername {
    pub user_id: Option<Int>,
    pub username: Text,
    pub locale: Option<Text>,
    pub timezone: Option<Text>,
    pub occupation: Option<Text>,
    pub pronouns: Option<Text>,
    pub updated_at: Timestamp,
}