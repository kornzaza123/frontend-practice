
/* import React, { useState, useEffect } from "react";
import "../../assets/css/Oem.css";

import Configs from "../../config"; */
import React, { Component, useEffect, useState } from "react";
import Footter from "../../component/Footter";
import Header from "../../component/Header";
import sortJsonArray from "sort-json-array";
import Sidebar from "../../component/Sidebar";
import jsPDF from "jspdf";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Swal from "sweetalert2";
import axios from "axios";
import { Get_font_pdf_th, Get_font_pdf_th2 } from "../../assets/font/pdf_font";
import Configs from "../../config";
import { getOem, getToken, getUser, getFeature, getComConfig } from "../../Utils/Common";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";
//import { getUser, getToken, setOem ,removeOem ,getOem } from "../../Utils/Common";
function stock_product_report(data) {

    var rowlog_wip = [3,5,4,6,2,1,9,4]
  const doc = new jsPDF("p", "mm", "a4");
  
  var Com_logo = `http://150.95.27.52:4001/static/Li91cGxvYWRzL+C4mOC4meC4suC4l+C4o+C4seC4nuC4ouC5jCDguITguYnguLLguYTguKHguYkvYmEwNTQxZDEtNzRiYi00MTgwLTg0OGYtYjNlMjJmYmVkNTQwX1RoYW5hc3ViIExvZ28ucG5n`;


 

  doc.addFileToVFS("THSarabunNew.ttf", Get_font_pdf_th2());
  doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
  doc.addFont('Rocki', 'bold');
  doc.setFont("THSarabunNew");
  doc.setFontSize(12)

  //logo
console.log(data)

var chack = 0 
var name = "";
 for (let l = 0; l < data.length; l++) {
    var productloop =[];
  
if (l > 0) {
  if (name !== data[l].name) {
    doc.addPage("l");
}
}

name = data[l].name
productloop = data[l].product

  var counts = 0;
  for (let index = 0; index < productloop.length; index = index + 36) {
    doc.addImage(Com_logo, 'JPEG',1,1, 23,23);
    doc.setFontSize(25)
    doc.text(104.5, 12 ,"ชื่อ รายการ stock ปัจจุบัน", "center");
    doc.setFontSize(15)
    doc.text(104.5, 21 ,"ประเภท : "+name.toString(), "center");
    
  doc.rect(0.5, 25 , 209, 12);

  doc.setFontSize(12)
    doc.rect(0.5, 25 , 18, 12);
    doc.text(9.5, 32 ,"ทุน", "center");
    doc.rect(18.5, 25 , 42, 12);
    doc.text(39.5, 32 ,"Product Description", "center");
    doc.rect(60.5, 25 , 40, 12);
    doc.text(80.5, 30,"Stock", "center");

    doc.setTextColor(255, 0, 0);
    doc.setFontSize(11)
    doc.text(80.5, 35,"ปรับปรุงล่าสุด : "+moment(new Date()).format("DD/MM/YY"), "center");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12)
    doc.rect(100.5, 25 , 20, 12);
    doc.text(110.5, 32 ,"Stock รายวัน", "center");
    doc.rect(120.5, 25 , 18, 12);
    doc.text(129.5, 32 ,"สินค้าโป้ว", "center");
    doc.rect(138.5, 25 , 48, 12);
    doc.text(197.75, 32 ,"Product No", "center");


    var looptabel = 0
  for (let y = 0; y < 36; y++) {
   
    doc.rect(0.5, 37+looptabel, 209, 7);
  
    doc.rect(18.5, 37+looptabel, 42, 7);
 
    doc.rect(60.5, 37+looptabel, 40, 7);

    doc.rect(100.5, 37+looptabel, 20, 7);
   
    doc.rect(120.5, 37+looptabel, 18, 7);
  
    doc.rect(138.5, 37+looptabel, 48, 7);

    looptabel += 7
  }
 var row = 0;
 var num = 0;
 var check_id = "";
  for (let i = 0; row < 36 ; i = i + 36) {
  /*   console.log("xzzzzzzxx",productloop[index+row].id,row) */
var sell_price = 0;
var description = "";
var pro_no = "";
var fg_amount = 0;
var allremark = ""
    if (!productloop[index+row]) {

console.log("xxxx",i)
    }else{
     
sell_price = parseFloat(productloop[index+row].sell_price || 0);
fg_amount = parseFloat(productloop[index+row].fg_amount || 0);
description = productloop[index+row].description || "";
pro_no = productloop[index+row].no;

for (let o = 0; o < description.length; o++) {
  if (o <34) {
    allremark += description[o]
  } else 
  if (o == 35) {
    allremark += "..."
  }

}



  

    }
    doc.setFontSize(10)
    console.log("xzzzzzzxx",pro_no,row)
    if (sell_price > 0 ) {
      doc.text(12, 42 + num,sell_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "right");
    }else{

    }
    if (fg_amount > 0) {
      doc.text(80.5, 42 + num,fg_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), "center");
    }
    
    doc.text(39.5, 42 + num,allremark.toString(), "center");
    doc.text(197.75, 42 + num,pro_no.toString(), "center");
    num += 7
    row = row+1;
    counts = productloop.length-36;


  }

  if (index < counts)
  {  doc.addPage("l");}
}

chack = chack +1
}
 var datenamereport = moment(new Date()).format("DD/MM/YY");
 var namereport = 'ชื่อ ราการ stock ปัจจุบัน '+datenamereport+'.pdf'

  window.open(doc.output('bloburl'), doc.output('save', namereport));


}


export default stock_product_report;
