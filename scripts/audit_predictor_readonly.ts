import fs from 'node:fs';
import { offlinePracticeTasks } from '../src/data/offline/catalog';
import { extractTopicIdFromEntityId } from '../src/lib/maturaPredictor';

const results = [];
for (const id of ['matematyka-podstawowa', 'jezyk-angielski', 'jezyk-polski', 'matematyka-rozszerzona']) {
  const tasks = await offlinePracticeTasks(id);
  const missing = tasks.filter(task => !extractTopicIdFromEntityId(task.id, id));
  results.push({ subject: id, total: tasks.length, idsWithoutTopicMapping: missing.length, examples: missing.slice(0, 4).map(task => task.id) });
}
fs.writeFileSync('artifacts/critical-audit/predictor-id-mapping.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
