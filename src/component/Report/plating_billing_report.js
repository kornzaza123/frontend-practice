import jsPDF from "jspdf";

import { Get_font_pdf_th, Get_font_pdf_th2 } from "../../assets/font/pdf_font";

import moment from "moment";
//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function plating_billing_report(data, usesrname) {
  var rowlog_wip = [3, 5, 4, 6, 2, 1, 9, 4];
  const doc = new jsPDF("l", "mm", "a5");

  console.log(data);

  var name = "";
  for (let i = 0; i < data.length; i++) {
    if (i > 0) {
      if (name !== data[i].name) {
        doc.addPage("l");
      }
    }
    name = data[i].name_com;
    var looptabel = data[i].view;
    console.log(looptabel, name);
    var po_name = data[i].pro_no;
    var counts = 0;
    for (let index = 0; index < looptabel.length; index = index + 10) {
      doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
      doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
      doc.addFont("Rocki", "bold");
      doc.setFont("THSarabunNew");

      doc.setFontSize(11);
      doc.text(15.5, 5, "บริษัท    เซ็นทรัล สปริง จำกัด", "left");
      /*  doc.text(15.5,9,"45 หมู่   9 ตำบลหนองตำลึง อำเภอพานทอง จังหวัดชลบุรี    20160","left"); */
      /*     doc.text(15.5,9,"TB :038-206-123 FAX:038-206-997","left"); */

      doc.text(25.5, 23, "SUB-MAKER: " + name.toString(), "left");
      doc.setFontSize(18);
      doc.text(105.5, 20, "ใบจ่ายงานชุบ", "center");

      doc.setFontSize(11);
      doc.text(
        145.5,
        15,
        "เลขที่ใบสั่งซื้อ      " + po_name.toString(),
        "left"
      );
      /*   doc.text(164.5,15,"POxxxxxxx","left"); */
      doc.text(145.5, 20, "วันที่", "left");
      doc.text(
        164,
        20,
        moment(new Date()).format("DD/MM/") +
          moment(new Date()).add("year", 543).format("YY"),
        "left"
      );

      /*  doc.setLineDash([4, 1], 0);
    doc.rect(13.5,0,184.5,150); 
  
    doc.setLineDash([0, 0], 0); */
      doc.rect(15.5, 28, 180.5, 10);

      doc.rect(15.5, 28, 180.5, 92);

      doc.rect(15.5, 28, 10, 72);
      doc.text(20.5, 34, "NO.", "center");
      doc.rect(25.5, 28, 95, 72);
      doc.text(73, 34, "PART NO / PART NAME / ผิวชุบ", "center");
      doc.rect(120.5, 28, 23, 72);
      doc.text(132, 34, "จำนวน", "center");
      doc.rect(143.5, 28, 23, 72);
      doc.text(155, 34, "กำหนดวันรับงาน", "center");
      doc.text(181, 34, "สรุปรับจริง", "center");

      doc.rect(15.5, 100, 180.5, 20);
      doc.rect(15.5, 100, 81, 20);
      doc.text(22.5, 106, "หมายเหตุ:", "center");

      doc.rect(96.5, 100, 33, 20);
      doc.rect(98.5, 112, 28, 0);
      doc.text(112.5, 116, "ผู้ออกเอกสาร", "center");
      doc.rect(129.5, 100, 33, 20);
      /*     doc.text(112.5,111,usesrname.toString(),"center"); */
      doc.rect(131.5, 112, 28, 0);
      doc.text(145.5, 116, "ผู้ส่งงาน", "center");
      doc.rect(164.5, 112, 28, 0);
      doc.text(178.5, 116, "ผู้รับงาน", "center");

      doc.text(43.5, 126, "F-PC3-03 Rev.:0 Date:01/05/51", "center");

      var row = 0;
      var num = 0;
      for (let i = 0; row < 10; i = i + 10) {
        var product_no = "";
        var product_name = "";
        var plated = "";
        var product_no = "";

        if (!looptabel[index + row]) {
        } else {
          product_no = looptabel[index + row].product_no;
          product_name = looptabel[index + row].product_name;
          plated = looptabel[index + row].plated;

          doc.text(20, 44 + num, (index + row + 1).toString(), "left");
          doc.text(
            30,
            44 + num,
            product_no.toString() +
              " " +
              product_name.toString() +
              " " +
              plated.toString(),
            "left"
          );
          if (looptabel[index + row].picecs_amount !== "") {
            var picecs_amount = parseFloat(
              looptabel[index + row].picecs_amount || 0
            );
            doc.text(
              142,
              44 + num,
              picecs_amount
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "  ชิ้น",
              "right"
            );
          } else {
            var weight_amount = parseFloat(
              looptabel[index + row].weight_amount || 0
            );
            doc.text(
              142,
              44 + num,
              weight_amount
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "  กก.",
              "right"
            );
          }
          /* if (looptabel[index+row].weight_amount  > 0) {
  var weight_amount =  parseFloat(looptabel[index+row].weight_amount || 0)
  doc.text(142,44+num,weight_amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"  กก.","right");
 } */

          if (looptabel[index + row].estimate_date) {
            doc.text(
              155,
              44 + num,
              moment(looptabel[index + row].estimate_date).format(
                "DD  /  MM  /  YY"
              ),
              "center"
            );
          }
        }

        num += 5.5;
        row = row + 1;
        counts = looptabel.length - 10;
      }

      if (index < counts) {
        doc.addPage("l");
      }
    }
  }

  window.open(doc.output("bloburl"));
}

export default plating_billing_report;
