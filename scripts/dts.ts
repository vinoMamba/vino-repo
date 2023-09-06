import { readdir, cp } from "fs/promises"
import { join } from "path"

async function getPkgNameList() {
  const dirs = await readdir(join(__dirname, "..", "dist/packages"), { withFileTypes: true })
  return dirs.filter(i => i.isDirectory()).map(i => i.name)
}
async function resovePkg(name: string) {
  try {
    const sourceDir = join(__dirname, "..", "dist/packages", name, "src")
    const targetDir = join(__dirname, "..", "packages", name, "dist")
    const sourceFiles = await readdir(sourceDir)
    const tasks = sourceFiles.map(file => {
      const sourceFile = join(sourceDir, file)
      const targetFile = join(targetDir, file)
      return cp(sourceFile, targetFile, {
        force: true,
        recursive: true
      })
    })
    await Promise.all(tasks)
    console.log(`[${name}]: moved successfully!`)
  } catch (e) {
    console.log(`[${name}]: moved failed!`)
  }
}

async function moveDtsFile() {
  try {
    const pkgNameList = await getPkgNameList()
    const tasks = pkgNameList.map(resovePkg)
    await Promise.all(tasks)
  } catch (e) {
    console.error("failed move!")
  }
}

moveDtsFile().catch(e => {
  console.error(e)
  process.exit(1)
})
