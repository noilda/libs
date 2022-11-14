import { addProjectConfiguration, formatFiles, Tree } from '@nrwl/devkit';
import path = require('path');
import { addFiles } from '../../utils/create-files';
import { createGoMod } from '../../utils/create-go-mod';
import { normalizeOptions } from '../../utils/param-normalization';
import { ILibraryGeneratorSchema } from './schema';

export default async function (tree: Tree, options: ILibraryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  addProjectConfiguration(tree, normalizedOptions.normalizedName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/${normalizedOptions.normalizedName}`,
    targets: {
      test: {
        executor: '@noilda/nx-go:test',
      },
      lint: {
        executor: '@noilda/nx-go:lint',
      },
    },
    tags: normalizedOptions.normalizedTags,
  });

  if (normalizedOptions.importPath) {
    createGoMod(tree, normalizedOptions);
  }
  
  addFiles(tree, path.join(__dirname, 'files'), normalizedOptions);
  await formatFiles(tree);
}
