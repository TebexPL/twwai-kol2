import paramDAO from '../DAO/paramDAO';

function create() {
    async function query() {
      let result = paramDAO.query();
      if (result) {
          return result;
      }
    }

    async function add(object) {
      let result = paramDAO.add(object);
      if(result)
        return result;

    }


    return {
        query: query,
        add: add
    };
}

export default {
    create: create
};
