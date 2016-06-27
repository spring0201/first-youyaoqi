module.exports = {
  rules: [
    {
      pattern: /\/api\/getlist.php\?rtype=origin$/,
      respondwith: './list.json'
    },
    {
      pattern: /\/api\/getlist.php\?rtype=refresh$/,
      respondwith: './list-refresh.json'
    },
    {
      pattern: /\/api\/getlist.php\?rtype=more$/,
      respondwith: './list-more.json'
    },
    {
      pattern: /\/api\/getlist.php\?rtype=ranking$/,
      respondwith: './ranking.json'
    },
    {
      pattern: /\/api\/getlist.php\?rtype=rankingRefresh$/,
      respondwith: './ranking-refresh.json'
    }
  ]
};
