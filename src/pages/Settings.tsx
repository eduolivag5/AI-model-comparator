import { Button, Avatar, Input, Select, SelectItem, Form } from "@heroui/react";
import { ChangeEvent, useRef, useState } from "react";
import { useUserSettings } from "../store/user";
import ModelSelector from "../components/ModelSelector";

export default function Settings() {
    const { 
        profilePicture, setProfilePicture, 
        username: storedUsername, setUsername, 
        email: storedEmail, setEmail, 
        language: storedLanguage, setLanguage 
    } = useUserSettings();

    // Estados locales para los inputs
    const [preview, setPreview] = useState<string | null>(profilePicture);
    const [username, setLocalUsername] = useState(storedUsername);
    const [email, setLocalEmail] = useState(storedEmail);
    const [language, setLocalLanguage] = useState(storedLanguage || "es");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageBase64 = reader.result as string;
                setPreview(imageBase64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Guardar en Zustand solo al hacer clic en "Guardar Cambios"
        setProfilePicture(preview);
        setUsername(username);
        setEmail(email);
        setLanguage(language);

        alert("¡Configuración guardada correctamente! ✅");
    };

    return (
        <Form onSubmit={handleSave} className="w-full space-y-3 p-2">
            <div className="flex gap-4 items-center">
                <Avatar isBordered size="lg" src={preview || undefined} alt="Foto de perfil" />
                
                <Input
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                />
            
                <Button onPress={triggerFileInput}>Subir Foto</Button>
                {preview && (
                    <Button onPress={handleRemoveImage} color="danger">
                        Eliminar Foto
                    </Button>
                )}
            </div>

            <Input 
                type="text" 
                label="Usuario"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setLocalUsername(e.target.value)}
            />

            <Input 
                type="email"
                label="Email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setLocalEmail(e.target.value)}
            />

            <Select
                label="Idioma"
                defaultSelectedKeys={[language]}
                value={language} 
                onChange={(e) => setLocalLanguage(e.target.value)}
            >
                <SelectItem value="es" key="es">Español</SelectItem>
                <SelectItem value="en" key="en">Inglés</SelectItem>
            </Select>

            <ModelSelector />  

            <Button type="submit" color="primary">Guardar Cambios</Button>
        </Form>
    );
}
