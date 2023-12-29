type SimpleObject = {
    one:string,
    two: number

}
const simpleObject:SimpleObject = {
    one: 'test text',
    two: 222
}

const xmlDocument = tools.open_doc<CareerReserveDocument>(1)

var b = simpleObject.GetOptProperty("one")


var c = xmlDocument?.TopElem.tasks[0].OptChild('name')
var c2 = xmlDocument?.TopElem.OptChild('aa')