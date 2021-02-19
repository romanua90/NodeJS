const path=require('path');
const fs=require('fs');
const boysGroup=path.join(__dirname, '18-00');
const girlsGroup=path.join(__dirname, '20-00');


function sortUsers (boysGroup, girlsGroup) {
fs.readdir(boysGroup, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    files.forEach(file => {
        fs.readFile(path.join(boysGroup, file), (e1, content) => {
            if (e1) {
                console.log(e1);
                return;
            }

            const buffer = JSON.parse(content.toString());

            if (buffer.gender === 'female') {
                fs.rename(path.join(boysGroup, file), path.join(girlsGroup, file), e2 => {
                    if (e2) {
                        console.log(e2);
                        return;
                    }
                    console.log('Sorting of MALE was DONE!');
                })
            }
        })
    })
})
}
fs.readdir(girlsGroup, (e, files)=>{
    if (e){
        console.log(e);
        return;
    }
    files.forEach(file=>{
        fs.readFile(path.join(girlsGroup, file), (e1,content)=>{
            if (e1){
                console.log(e1);
                return;
            }
            const buffer= JSON.parse(content.toString());
            if (buffer.gender==='male'){
                fs.rename(path.join(girlsGroup, file), path.join(boysGroup,file), e2=>{
                    if (e2) {
                        console.log(e2);
                        return;
                    }
                    console.log('Sorting of FEMALE was done!');
                })
            }

        })
    })
})

sortUsers(boysGroup, girlsGroup);
