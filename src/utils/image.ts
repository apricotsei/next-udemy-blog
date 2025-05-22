import { writeFile,mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function saveImage(file: File): Promise<string | null>{
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}_${file.name}`
    const uploadDir = path.join(process.cwd(), 'public/images')
    
    try{
        //フォルダがなければ作成
        if(!existsSync(uploadDir)){
            await mkdir(uploadDir, { recursive: true})
        }

        const filePath = path.join(uploadDir, fileName)
        await writeFile(filePath, buffer)
        return `/images/${fileName}`
    }catch(error){
        console.error('画像保存エラー:',error)
        return null
    }
}