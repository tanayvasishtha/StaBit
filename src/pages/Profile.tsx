import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";

type ProfileState = {
    firstName: string;
    lastName: string;
    bio: string;
    avatarDataUrl?: string;
};

const LOCAL_STORAGE_KEY = "stabit.profile";

const Profile = () => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<ProfileState>({ firstName: "", lastName: "", bio: "" });

    useEffect(() => {
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as ProfileState;
                setProfile({ firstName: parsed.firstName || "", lastName: parsed.lastName || "", bio: parsed.bio || "", avatarDataUrl: parsed.avatarDataUrl });
            }
        } catch {
            // ignore corrupted data
        }
    }, []);

    const handleAvatarClick = () => fileInputRef.current?.click();

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setProfile((p) => ({ ...p, avatarDataUrl: String(reader.result) }));
        };
        reader.readAsDataURL(file);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile.firstName.trim()) {
            toast({ title: "First name required", description: "Please enter your first name." });
            return;
        }
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
            toast({ title: "Profile updated", description: "Your changes have been saved." });
        } catch {
            toast({ title: "Save failed", description: "Unable to save to your browser." });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Navigation />
            <Sidebar activeSection="profile" />

            <div className="lg:pl-56 pt-14">
                <main className="container mx-auto px-6 pb-12">
                    <form onSubmit={handleSave} className="max-w-3xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Profile</h2>
                            <p className="text-sm text-muted-foreground">Manage your profile information and security.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            {profile.avatarDataUrl ? (
                                <img src={profile.avatarDataUrl} alt="Avatar" className="h-16 w-16 rounded-full object-cover border border-border/40" />
                            ) : (
                                <div className="h-16 w-16 rounded-full bg-muted/50 border border-border/40" />
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                            <Button type="button" variant="outline" onClick={handleAvatarClick}>Upload avatar</Button>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="first">First name</Label>
                                <Input id="first" placeholder="Jane" value={profile.firstName} onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last">Last name</Label>
                                <Input id="last" placeholder="Doe" value={profile.lastName} onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Short description about you" value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit">Save profile</Button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Profile;


