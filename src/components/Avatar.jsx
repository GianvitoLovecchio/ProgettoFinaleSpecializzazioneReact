import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import noImageProfile from '../img/no_img_profile.png'

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)


    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    //funzione di scaricamento immagine
    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage
                .from('avatars')
                .download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)

        } catch (error) {
            console.log('Errore scaricamento immagine: ', error.message)
        }
    }

    //funzione di caricamento immagine
    const uploadAvatar = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("Devi scegliere un'immagine da caricare!")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(event, filePath)

        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }
    return (
        <div className="mb-6 flex justify-evenly">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="avatar"
                    style={{ width: size, height: size }}
                    className="rounded-full object-cover"
                />
            ) : (
                <img
                    src={noImageProfile}
                    alt="avatar"
                    style={{ width: size, height: size }}
                    className="rounded-full object-cover"
                />
            )}
            <div className="flex items-center">
                <input
                    type="file"
                    id="single"
                    accept="image/"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                />
                <label
                    htmlFor="single"
                    className="flex items-center pl-3 py-1 w-20 cursor-pointer items-center text-sm bg-red-800 border border-red-800 rounded-lg text-white mt-4 hover:scale-105 transition duration-500 hover:bg-blue-50 hover:text-black transition disabled:opacity-50"
                >{uploading ? "Uploading ..." : "Modifica"}
                </label>
            </div>
        </div>
    )
}