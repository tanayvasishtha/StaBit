import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
    const { toast } = useToast();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ title: "Settings saved", description: "Your preferences were updated." });
    };

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Navigation />
            <Sidebar activeSection="settings" />

            <div className="lg:pl-56 pt-14">
                <main className="container mx-auto px-6 pb-12">
                    <form onSubmit={handleSave} className="max-w-4xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/40 rounded-3xl p-6 shadow-card space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Settings</h2>
                            <p className="text-sm text-muted-foreground">Configure your preferences and account settings.</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="email">Contact email</Label>
                                <Input id="email" type="email" placeholder="you@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Display name</Label>
                                <Input id="username" placeholder="Your name" />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 p-4">
                                <div>
                                    <p className="text-sm font-medium">Dark mode</p>
                                    <p className="text-xs text-muted-foreground">Use a dark theme throughout the app.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 p-4">
                                <div>
                                    <p className="text-sm font-medium">Email notifications</p>
                                    <p className="text-xs text-muted-foreground">Receive updates about activity and offers.</p>
                                </div>
                                <Switch />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="password">New password</Label>
                                <Input id="password" type="password" placeholder="••••••••" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm">Confirm password</Label>
                                <Input id="confirm" type="password" placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit">Save changes</Button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;


