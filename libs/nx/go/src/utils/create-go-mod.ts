import { Tree } from '@nrwl/devkit';
import { join } from 'path';
import { ILibraryNormalizedBaseSchema } from '../types/schema';
import { goVersion } from './go-version';

export function createGoMod(tree: Tree, options: ILibraryNormalizedBaseSchema) {
  const filePath = join(options.projectRoot, 'go.mod');
  const { major, minor } = goVersion();

  if (!tree.exists(filePath)) {
    tree.write(
      filePath,
      `module ${
        options?.importPath
          ? join(options.importPath, options.projectRoot)
          : options.normalizedName
      }\ngo ${major}.${minor}\n`
    );
  }
}
