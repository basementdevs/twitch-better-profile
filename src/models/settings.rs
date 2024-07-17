use std::fmt;
use charybdis::macros::charybdis_model;
use charybdis::types::{Int, Text, Timestamp, Uuid};
use chrono::{DateTime, TimeZone, Utc};
use serde::{de, Deserialize, Deserializer, Serialize};
use serde::de::Visitor;

#[charybdis_model(
    table_name = settings,
    partition_keys = [user_id],
    clustering_keys = [updated_at],
    global_secondary_indexes = [],
    local_secondary_indexes = [],
    static_columns = [],
    table_options = "
     CLUSTERING ORDER BY (updated_at DESC)
    "
)]
#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct Settings {
    pub user_id: Int,
    pub locale: Text,
    pub timezone: Option<Text>,
    pub pronouns: Text,
    #[serde(default = "default_updated_at")]
    pub updated_at: Timestamp,
}

fn default_updated_at() -> DateTime<Utc> {
    Utc::now()
}