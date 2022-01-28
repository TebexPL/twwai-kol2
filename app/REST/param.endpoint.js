import business from '../business/business.container';
import applicationException from "../service/applicationException";

const paramEndpoint = (router) => {
  router.get('/api/params', async (request, response, next) => {
      try {
          let result = await business.getParamManager().query();
          response.status(200).send(result);
      } catch (error) {
          applicationException.errorHandler(error, response);
      }
  });

  router.post('/api/params', async (request, response, next) => {
      try {
          let result = await business.getParamManager().add(request.body);
          response.status(200).send(result);
      } catch (error) {
          applicationException.errorHandler(error, response);
      }
  });


};
export default paramEndpoint;
