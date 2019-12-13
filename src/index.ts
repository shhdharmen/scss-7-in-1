import { Command, flags } from '@oclif/command'
import { ncp, Options } from 'ncp';
import { join } from 'path';
import chalk from 'chalk';
import { get } from 'node-emoji';
import * as Listr from 'listr';

const source = join(__dirname, 'content');

class Scss7In1 extends Command {
  static description = 'Generates SASS - 7 in 1 architecture (https://sass-guidelin.es/#the-7-1-pattern) quickly in your current directory.'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    dir: flags.string({ char: 'd', description: 'directory name in which 7-in-1 architecture will be created', default: 'styles' }),
    write: flags.boolean({ char: 'w', description: 'Whether to overwrite existing files/folder or not', default: false })
  }

  async run() {
    const { flags } = this.parse(Scss7In1)
    const destination = join(process.cwd(), flags.dir);
    const copyOptions: Options = { clobber: flags.write }
    const tasks = new Listr([
      {
        title: 'Copy Files and Folders',
        task: () => ncp(source, destination, copyOptions, (error) => {
          if (error) {
            throw error;
          }
        })
      }
    ])
    await tasks.run();
    this.log(chalk.greenBright(get('white_check_mark') + chalk.bold('  DONE:') + ' SCSS 7-in-1 Pattern ' + chalk.italic.underline('(https://sass-guidelin.es/#the-7-1-pattern)') + ' created in directory: ' + chalk.italic.underline(destination) + '.'));
  }
}

export = Scss7In1
