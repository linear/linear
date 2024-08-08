// eslint-disable-next-line @typescript-eslint/no-var-requires
const changeCaseAll = require("change-case-all");

// Sometimes we have two queries with the same case. If we do, add the query names here (PascalCased), and we'll perform
// deduplication on their query args to allow the SDK to build by suffixing additional types with the same name with a
// counter.
const duplicateQueries = ["ProjectMilestone", "ProjectMilestones"];

// We have some non pascal cased types that we need to keep as is.
const incorrectCase = ["SLADayCountType"];

// Object containing counters of how many times we've seen each DuplicateQueryNameArgs type.
const deduplicate = Object.fromEntries(duplicateQueries.map(query => [`Query${query}Args`, 0]));

exports.case = type => {
  if (type in deduplicate) {
    if (deduplicate[type] > 0) {
      type = type + deduplicate[type];
    }
    deduplicate[type] += 1;
  }
  if (incorrectCase.includes(type)) {
    return type;
  }
  return changeCaseAll.pascalCase(type);
};
