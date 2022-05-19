var fs = require("fs");
const xl = require("excel4node");

var wb = new xl.Workbook();
var ws = wb.addWorksheet("Sheet1");
wb.write("Top-Blockchain-Projects(1000).xlsx");

let pages = 67;

for (let i = 0; i < 15 * pages; i += 15) {
  var obj = JSON.parse(fs.readFileSync(`page${i / 15 + 1}.json`, "utf8"));
  obj.results.forEach((e, index) => {
    let name = e.dapp.name;
    let id = e.dapp.identifier;
    let networks = "";
    e.dapp.chains.forEach((e) => {
      networks += e.name + " ,";
    });

    let users30days = e.user_30d;
    let users7days = e.user_7d;
    let users24h = e.user_24h;

    let volume24h = e.volume_24h;
    let amount24h = e.amount_24h;

    let community = e.community;
    let category = e.dapp.category.name;

    ws.cell(i + index + 5, 1).string((i + index).toString());
    ws.cell(i + index + 5, 2).string(name);
    ws.cell(i + index + 5, 3).string(networks);
    ws.cell(i + index + 5, 4).string(category);
    ws.cell(i + index + 5, 5).string(community.toString());
    ws.cell(i + index + 5, 6).string(users24h.toString());
    ws.cell(i + index + 5, 7).string(users7days.toString());
    ws.cell(i + index + 5, 8).string(users30days.toString());
    ws.cell(i + index + 5, 9).string(volume24h.toString());
    ws.cell(i + index + 5, 10).string(amount24h.toString());
    ws.cell(i + index + 5, 11).string(id);
  });
}

// creating files
// for (let i = 1; i <= pages; i++) {
//   fs.writeFile(`page${i}.json`, "", () => {});
// }
