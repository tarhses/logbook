use std::error::Error;
use std::net::SocketAddr;

use serde::Deserialize;

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Config {
    pub address: SocketAddr,
    pub database: String,
}

pub fn load() -> Result<Config, Box<dyn Error>> {
    let path = std::env::var("CONFIG").unwrap_or_else(|_| String::from("config.toml"));
    let toml = std::fs::read_to_string(path)?;
    Ok(toml::from_str(&toml)?)
}
