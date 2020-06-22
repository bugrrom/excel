import {Page} from '../core/Page';
import {$} from '../core/dom';
import {createRecordsTable} from './dashboard.function';

type DashboardPagePage = {
    getRoot: () => void
}

export class DashboardPage extends Page implements DashboardPagePage{
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(`
            <div class="db__header">
      <h1>Excel Dashboard</h1>
    </div>

    <div class="db__new">
      <div class="db__view">
        <a href="#excel/${now}" class="db__create">
          Новая <br /> Таблица
        </a>
      </div>
    </div>

    <div class="db__table db__view">
        ${createRecordsTable()}
    </div>

        `);
  }
}
