SELECT SUM(totalIssuer) AS total_compras_brl
FROM ep747
WHERE settlementCurrency = 'BRL';

SELECT SUM(totalIssuer) AS total_compras_usd
FROM ep747
WHERE settlementCurrency = 'USD';

SELECT SUM(totalReimbursement) AS total_saques_brl
FROM ep747
WHERE settlementCurrency = 'BRL';

SELECT SUM(totalReimbursement) AS total_saques_usd
FROM ep747
WHERE settlementCurrency = 'USD';

SELECT SUM(totalSettlement) AS total_repasse_liquido_brl
FROM ep747
WHERE settlementCurrency = 'BRL';

SELECT SUM(totalSettlement) AS total_repasse_liquido_usd
FROM ep747
WHERE settlementCurrency = 'USD';


SELECT 
  SUM(CASE WHEN settlementCurrency = 'BRL' THEN totalIssuer ELSE 0 END) AS total_compras_brl,
  SUM(CASE WHEN settlementCurrency = 'USD' THEN totalIssuer ELSE 0 END) AS total_compras_usd,
  SUM(CASE WHEN settlementCurrency = 'BRL' THEN totalReimbursement ELSE 0 END) AS total_saques_brl,
  SUM(CASE WHEN settlementCurrency = 'USD' THEN totalReimbursement ELSE 0 END) AS total_saques_usd,
  SUM(CASE WHEN settlementCurrency = 'BRL' THEN totalSettlement ELSE 0 END) AS total_repasse_liquido_brl,
  SUM(CASE WHEN settlementCurrency = 'USD' THEN totalSettlement ELSE 0 END) AS total_repasse_liquido_usd
FROM ep747;
