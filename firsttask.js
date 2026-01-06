
function medicialexpiry(data){
    let result = [];
    let today = new Date()
    for(let medicalinfo of data){
        let currentdateinfo = new Date(medicalinfo.expiry);
        let daysinfo = (currentdateinfo - today) / (1000*60*60*24);
        if(medicalinfo.stock < medicalinfo.min){
            result.push({name:medicalinfo.name , reason: "Low Stock"})
            console.log(medicalinfo.stock,medicalinfo.min,"MMM")
        }else if(daysinfo <= 30){
            result.push({name:medicalinfo.name , reason: "Expiring Soon"})
        }

        
    }
    
    return result
}
let workdata = [
{ "name": "Paracetamol", "expiry": "2026-02-01", "stock": 20,
"min": 30 },
{ "name": "Amoxicillin", "expiry": "2026-01-15", "stock": 50,
"min": 20 }
]

console.log(medicialexpiry(workdata),"result")
