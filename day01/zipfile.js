var fs=require("fs");
var zlib=require("zlib");

//读取文件 然后生成压缩文件  可以使用第三方开源库
fs.createReadStream("./day01").pipe(zlib.createGzip()).pipe(fs.createWriteStream("input.gz"));

console.log("文件压缩完成");