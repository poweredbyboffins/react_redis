var _=require('lodash')
data = []

columns=[]
columns=['item1','item2']

data=[ [1,2],[3,4]]


dataObjects=[]


for (let i = 1; i < data.length; i += 1) {
          dataObjects.push(_(columns)
            .zip(data[i])
            .chunk(5)
            .value()
          );
        }
console.log(dataObjects)
