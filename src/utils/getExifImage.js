import EXIF from './exif'

export const cutImage = (oriFile)=>{ //源文件,宽,高
  getPhotoOrientation(oriFile)
}

//获取orientation
function getPhotoOrientation(oriFile){
    let orient = null //= EXIF.getTag(oriFile.img,'Orientation');
    EXIF.getData(oriFile.img, function () {
      orient = EXIF.getTag(this,'Orientation');
      alert(orient)
      getWidthAndHeight(orient,oriFile)
    });
}

// 对图片进行压缩
function rotateAndCut(oriFile , angle ,width=0 ,height=0) {
  try {
    const newWidth = oriFile.width
    const newHeight = oriFile.height
    let offsetX = 0  //需要裁剪
    let offsetY = 0
    if(width && height) {
      if(width-height>=50){
        offsetX = (width-height)/2
      }else if(width-height<=-50){
        offsetY = (height-width)/2
      }
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;
    if(angle){
      ctx.rotate(angle*Math.PI/180);
      if(angle===90){
        ctx.drawImage(oriFile.img, offsetX , offsetY ,width-2*offsetX ,height-2*offsetY, 0, -newWidth, newHeight, newWidth);
      }else if(angle===-90){
        ctx.drawImage(oriFile.img, offsetX , offsetY ,width-2*offsetX ,height-2*offsetY, -newHeight, 0, newHeight, newWidth);
      }
    }else{
      //ctx.drawImage(oriFile.img,0,0,200,200);
      console.log(offsetX, offsetY,width-2*offsetX ,height-2*offsetY, 0 , 0, newWidth, newHeight);
      ctx.drawImage(oriFile.img, offsetX , offsetY ,width-2*offsetX ,height-2*offsetY, 0 , 0, newWidth, newHeight);
    }
    // 图像质量

    const quality = 1;
    // quality值越小，所绘制出的图像越模糊
    let base64 = canvas.toDataURL('image/jpeg', quality);
    oriFile.base64 = base64
    oriFile.img = dataURLtoFile(base64,oriFile.name);
    oriFile.status = 0
    getObjectURL(oriFile.img)
  }catch(e){
    oriFile.status=-1
    console.log("压缩失败!");
    console.log(e);
  }
}

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

function getWidthAndHeight(orient,oriFile){
  const fileReader = new FileReader();
  fileReader.readAsDataURL(oriFile.img);//根据图片路径读取图片
  fileReader.onload = function() {
    const base64 = this.result;
    let img = new Image();
    img.src = base64;
    img.onload = function() {
      oriFile.img = img
      const width = img.naturalWidth
      const height = img.naturalHeight
      console.log(width+'---'+height + "---"+orient)
      if( orient===6|| orient===8 || orient===3){//需要旋转
        if(orient===6) {
          rotateAndCut(oriFile, 90, width, height)
        }else if(orient===8){
          rotateAndCut(oriFile , -90, width, height)
        }
      }
      else{//不需要旋转
        rotateAndCut(oriFile,0 ,width, height)
      }
      delete this
    }
  }
}

function getObjectURL(file) {
  let url = null ;
  if (window.createObjectURL!=undefined) { // basic
    url = window.createObjectURL(file) ;
  } else if (window.URL!=undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file) ;
  } else if (window.webkitURL!=undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file) ;
  }
  //window.location.href = url
  console.log(url);
  return url ;
}
