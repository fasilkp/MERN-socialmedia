export const replaceSpecialCharecters=(str)=>{
    return str.replace(/([*+?^=!:${}';%@#^&<>,`~()|\[\]\/\\])/g, "").replace(/"/g, '').replace(/ /g, '').toLowerCase()
  }
