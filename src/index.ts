import { Command, flags } from '@oclif/command'
import { ncp, Options } from 'ncp';
import { join } from 'path';

class Scss7In1 extends Command {
  static description = 'Generates SASS - 7 in 1 architecture (https://sass-guidelin.es/#the-7-1-pattern) quickly in your current directory.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    dir: flags.string({ char: 'd', description: 'directory name in which 7-in-1 architecture will be created', default: 'styles' }),
    write: flags.boolean({ char: 'w', description: 'Whether to overwrite existing files/folder or not', default: false })
  }

  static args = [{ name: 'file' }]

  async run() {
    const { flags } = this.parse(Scss7In1)
    const destination = join(process.cwd(), flags.dir);
    const source = join(__dirname, 'content');
    const copyOptions: Options = { clobber: flags.write }
    ncp(source, destination, copyOptions, (error) => {
      if (error) {
        return console.error(error);
      }
      console.log('Done.');
    })
  }
}

export = Scss7In1
