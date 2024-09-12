import path from 'path';

import { type PackageJson } from 'type-fest';

import { readJSONFileSync } from './fileSystem';
import { PKG_ROOT } from '../consts';

export function getVersion() {
  const packageJsonPath = path.join(PKG_ROOT, 'package.json');

  const packageJsonContent = readJSONFileSync(packageJsonPath) as PackageJson;

  return packageJsonContent.version ?? '1.0.0';
}
