import {Request, Response} from 'express'

class TestController {
  public test = (req: Request, res: Response) => {
    res.send({test: 'yeah'});
  }
}

export default TestController;