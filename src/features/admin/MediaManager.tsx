import React, { useState } from 'react';
import { Film, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ImageDropZone } from '../../components/common/ImageDropZone';
import { useData } from '../../context/DataContext';

export const MediaManager = () => {
    const { mediaPanels, updateMediaPanel } = useData();
    const [saved, setSaved] = useState<number | null>(null);

    const handleSave = (panelId: number) => {
        const panel = mediaPanels.find(p => p.id === panelId);
        if (panel) {
            updateMediaPanel(panelId, panel);
            setSaved(panelId);
            setTimeout(() => setSaved(null), 2000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-white">Media Management</h1>
                    <p className="text-gray-400 text-sm">
                        Manage the two media panels displayed on the landing page. Each panel crossfades between two images with a blur effect.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {mediaPanels.map((panel, index) => (
                    <div
                        key={panel.id}
                        className="bg-linear-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gold/10 rounded-xl p-6 space-y-5"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                                <Film size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Panel {index + 1}</h3>
                                <p className="text-xs text-gray-500">Two images that crossfade with blur</p>
                            </div>
                        </div>

                        {/* Label */}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Label (optional)</label>
                            <input
                                type="text"
                                value={panel.label || ''}
                                onChange={(e) => updateMediaPanel(panel.id, { label: e.target.value })}
                                className="w-full bg-dark border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                placeholder="e.g. Before & After"
                            />
                        </div>

                        {/* Image 1 */}
                        <ImageDropZone
                            label="Image 1"
                            value={panel.image1}
                            onChange={(dataUrl) => updateMediaPanel(panel.id, { image1: dataUrl })}
                            maxSizeMB={5}
                        />

                        {/* Image 2 */}
                        <ImageDropZone
                            label="Image 2"
                            value={panel.image2}
                            onChange={(dataUrl) => updateMediaPanel(panel.id, { image2: dataUrl })}
                            maxSizeMB={5}
                        />

                        {/* Preview */}
                        {(panel.image1 || panel.image2) && (
                            <div className="pt-2">
                                <p className="text-xs text-gray-500 mb-2">Preview (crossfade effect visible on landing page)</p>
                                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-dark border border-white/10">
                                    {panel.image1 && (
                                        <img
                                            src={panel.image1.startsWith('data:') ? panel.image1 : `${panel.image1}&auto=format&fit=crop&w=400&q=60`}
                                            alt="Preview 1"
                                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                                        />
                                    )}
                                    {panel.image2 && (
                                        <img
                                            src={panel.image2.startsWith('data:') ? panel.image2 : `${panel.image2}&auto=format&fit=crop&w=400&q=60`}
                                            alt="Preview 2"
                                            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-lighten"
                                        />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white/60 text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                            Crossfade preview
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <Button variant="primary" onClick={() => handleSave(panel.id)}>
                                <Save size={16} className="mr-2" />
                                {saved === panel.id ? 'Saved!' : 'Save Panel'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
