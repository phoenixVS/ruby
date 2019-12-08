exports('coef_table', (params, done) => {
  insertHtmlModules({
    ".coeficient-table": [
      "main/coeficient-table.html"
    ]
  }, () => {
    
    $.ajax({
      url: 'http://bestline.bet/inplay/',
      success: function (data) {
        
        if (data != undefined) {
          
          $(`[data-id="coef-one"]`).text(data.DATA[0].CT[0].EV[0].MA[0].PA[0].OD.D);
          $(`[data-id="coef-two"]`).text(data.DATA[0].CT[0].EV[0].MA[0].PA[2].OD.D);
          $(`[data-id="coef-three"]`).text(data.DATA[0].CT[0].EV[0].MA[0].PA[1].OD.D);
          
        } else {
          console.log("ERROR: Data is undefined")
        }
      }
    });
    done();
  });
});  