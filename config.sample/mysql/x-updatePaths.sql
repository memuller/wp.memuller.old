# Migrates a production-ready database dump to
# one at memuller.dev, running locally, w/ multisite subdomains

UPDATE xm_site SET domain = REPLACE(domain, "memuller.com", "memuller.dev");

UPDATE xm_blogs SET domain = REPLACE(domain, "memuller.com", "memuller.dev");
UPDATE xm_blogs SET domain = "memuller.dev", path = "/jensm" WHERE domain = "jeancatanho.com";

UPDATE xm_options SET option_value = REPLACE(option_value, "memuller.com", "memuller.dev");
UPDATE xm_2_options SET option_value = REPLACE(option_value, "memuller.com", "memuller.dev");
UPDATE xm_3_options SET option_value = REPLACE(option_value, "jeancatanho.com", "memuller.dev/jensm");