var changeCaseAll = require("change-case-all");

exports.case = (type) => {
    if(type.includes("ProjectMilestoneQuery") || type.includes("ProjectMilestonesQuery")) {
        console.log("will not touch:", type)
         return "ProjectMilestoneQueryDoNotUse";
    }
    console.log("Will pascal case:", type)
    return changeCaseAll.pascalCase(type)
}
