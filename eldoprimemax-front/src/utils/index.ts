function formatDate(date: any){
    let splitedDate = date.split(/[- : T Z]/);
    // return new Date(Date.UTC(splitedDate[0], splitedDate[1]-1, splitedDate[2], splitedDate[3], splitedDate[4]))
    // .toLocaleDateString()
    let data = [splitedDate[1], splitedDate[2], splitedDate[0]].join('/')
    return data
}

function getYear(date: any){
    let splitedDate = date.split(/[- : T Z]/);
    return new Date(Date.UTC(splitedDate[0], splitedDate[1]-1, splitedDate[2], splitedDate[3], splitedDate[4]))
    .getFullYear()
}

function dateToInputDate(date: any){
   let withSlash =  formatDate(date)
   let splitedDate = withSlash.split('/')
   let formatedDateToInput = [splitedDate[2], splitedDate[0], splitedDate[1]]
    return formatedDateToInput.join('-')
}




export {formatDate,getYear,dateToInputDate}