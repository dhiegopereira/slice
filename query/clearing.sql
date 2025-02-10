
SELECT SUM(purchase_value) AS total_compras_brl
FROM clearing
WHERE purchase_value IS NOT NULL AND dest_currency = 986;

SELECT SUM(purchase_value) AS total_compras_usd
FROM clearing
WHERE purchase_value IS NOT NULL AND dest_currency = 840;

SELECT SUM(clearing_value - clearing_commission) AS total_repasse_liquido_brl
FROM clearing
WHERE clearing_value IS NOT NULL AND clearing_commission IS NOT NULL AND dest_currency = 986;

SELECT SUM(clearing_value - clearing_commission) AS total_repasse_liquido_usd
FROM clearing
WHERE clearing_value IS NOT NULL AND clearing_commission IS NOT NULL AND dest_currency = 840;

SELECT 
    SUM(CASE WHEN dest_currency = 986 THEN purchase_value ELSE 0 END) AS total_compras_brl,
    SUM(CASE WHEN dest_currency = 840 THEN purchase_value ELSE 0 END) AS total_compras_usd,
    SUM(CASE WHEN dest_currency = 986 AND clearing_value IS NOT NULL AND clearing_commission IS NOT NULL 
             THEN (clearing_value - clearing_commission) ELSE 0 END) AS total_repasse_liquido_brl,
    SUM(CASE WHEN dest_currency = 840 AND clearing_value IS NOT NULL AND clearing_commission IS NOT NULL 
             THEN (clearing_value - clearing_commission) ELSE 0 END) AS total_repasse_liquido_usd
FROM clearing
WHERE (purchase_value IS NOT NULL OR (clearing_value IS NOT NULL AND clearing_commission IS NOT NULL));
