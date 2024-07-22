use std::fmt;
use charybdis::macros::charybdis_model;
use charybdis::types::{Int, Text, Timestamp, Uuid};
use chrono::{DateTime, TimeZone, Utc};
use serde::{de, Deserialize, Deserializer, Serialize};
use serde::de::Visitor;

#[charybdis_model(
    table_name = messages,
    partition_keys = [channel_id],
    clustering_keys = [sent_at],
    global_secondary_indexes = [username],
    local_secondary_indexes = [],
    static_columns = []
)]
#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    pub channel_id: Int,
    pub user_id: Int,
    pub username: Text,
    pub message_id: Uuid,
    pub content: Text,
    pub color: Text,
    #[serde(deserialize_with = "deserialize_epoch")]
    pub sent_at: Timestamp,
}

// Custom deserializer function
fn deserialize_epoch<'de, D>(deserializer: D) -> Result<DateTime<Utc>, D::Error>
where
    D: Deserializer<'de>,
{
    struct EpochVisitor;

    impl<'de> Visitor<'de> for EpochVisitor {
        type Value = DateTime<Utc>;

        fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
            formatter.write_str("an integer timestamp")
        }

        fn visit_i64<E>(self, value: i64) -> Result<DateTime<Utc>, E>
        where
            E: de::Error,
        {
            let value = value / 1000;
            Utc.timestamp_opt(value, 0)
                .single()
                .ok_or_else(|| de::Error::custom("invalid timestamp"))
        }

        fn visit_u64<E>(self, value: u64) -> Result<DateTime<Utc>, E>
        where
            E: de::Error,
        {
            let value = value / 1000;
            Utc.timestamp_opt(value as i64, 0)
                .single()
                .ok_or_else(|| de::Error::custom("invalid timestamp"))
        }
    }

    deserializer.deserialize_any(EpochVisitor)
}