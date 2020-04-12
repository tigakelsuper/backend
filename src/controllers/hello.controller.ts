// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { get } from '@loopback/rest';
import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import { ACL_PROJECT } from './project.controller';



export class HelloController {
  @get('/hello')
  hello(): string {
    return 'Hello world';
  }

  @get('/secret', {
    responses: {
      '200': {
        description: 'Array of all Project model instances including balance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: [
                { id: 1, nama: "a" },
                { id: 2, nama: "b" }
              ],
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize(ACL_PROJECT['view-all'])
  async secret(): Promise<string> {
    return 'Halaman rahasia';
  }

}
