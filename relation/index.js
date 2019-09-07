//by refrences (Normalization)

let author = {
    name: 'Vipul'
};

let course = {
    name:'nodejs',
    atuhor:'id'
}


//Embeded (DeNormalization)

let course = {
    name:'nodejs',
    author:{
        name: 'vipul'
    }
}