'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  _id?: string;
  buildId: string;
  title: string;
  description: string;
  tech: string[];
  status: 'ACTIVE' | 'DEPLOYED' | 'ARCHIVED' | 'MAINTENANCE';
  coordinates: string;
  link: string;
  image?: string; 
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState<Project>({
    buildId: '01',
    title: '',
    description: '',
    tech: [],
    status: 'ACTIVE',
    coordinates: 'Web Application',
    link: '',
    image: '',
  });
  
  const [techInput, setTechInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch('/api/projects');
        const json = await res.json();
        if (isMounted && json.success) setProjects(json.data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Saving...');

    const payload = {
      ...formData,
      tech: techInput.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMessage(editingId ? 'Project updated successfully' : 'Project published successfully');
        resetForm();
        fetchProjects();
      } else {
        setStatusMessage('Failed to save project');
      }
    } catch {
      setStatusMessage('A network error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleEdit = (p: Project) => {
    setEditingId(p._id || null);
    setFormData({
      buildId: p.buildId,
      title: p.title,
      description: p.description,
      tech: p.tech,
      status: p.status,
      coordinates: p.coordinates,
      link: p.link,
      image: p.image || '',
    });
    setTechInput(p.tech.join(', '));
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for editing
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      buildId: String(projects.length + 1).padStart(2, '0'),
      title: '',
      description: '',
      tech: [],
      status: 'ACTIVE',
      coordinates: 'Web Application',
      link: '',
      image: '',
    });
    setTechInput('');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-6 md:p-12 selection:bg-[#4ade80] selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
       {/* Header */}
<div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border/50 pb-6 gap-4">
  <div>
    <div className="text-[10px] text-muted tracking-widest uppercase mb-1">FW Labs // Admin</div>
    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">Project Management</h1>
  </div>
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-3 text-[10px] tracking-widest text-[#4ade80] uppercase">
      <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
      Admin Logged In
    </div>
    <button
      onClick={handleLogout}
      className="text-[10px] tracking-widest uppercase text-muted hover:text-red-400 transition-colors border border-border/50 px-3 py-1 bg-surface"
    >
      [ Logout ]
    </button>
  </div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Operations */}
          <form onSubmit={handleSave} className="lg:col-span-5 border border-border/50 bg-[#050505] p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-3 text-xs tracking-widest uppercase">
              <span className="text-[#4ade80]">&gt; {editingId ? 'Edit Project' : 'New Project'}</span>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-muted hover:text-white transition-colors">
                  [Cancel]
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] text-muted uppercase tracking-wider">Project Number</label>
                <input
                  type="text"
                  value={formData.buildId}
                  onChange={(e) => setFormData({ ...formData, buildId: e.target.value })}
                  className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] text-muted uppercase tracking-wider">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                  className="bg-[#050505] border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="DEPLOYED">Deployed</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-wider">Project Name</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-wider">Category</label>
              <input
                type="text"
                placeholder="e.g., Web Application"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-wider">Live URL</label>
              <input
                type="url"
                placeholder="https://"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-wider">Image URL</label>
              <input
                type="url"
                placeholder="https://... (Leave blank for text fallback)"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-wider">Tech Stack (Comma Separated)</label>
              <input
                type="text"
                placeholder="Next.js, TypeScript, PostgreSQL"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-muted uppercase tracking-wider">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-transparent border-b border-border/50 pb-1 text-xs focus:border-[#4ade80] outline-none resize-none transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-[#4ade80] uppercase tracking-wider">{statusMessage}</span>
              <button
                type="submit"
                className="text-xs uppercase bg-foreground text-background px-6 py-2.5 hover:bg-[#4ade80] transition-colors"
              >
                [ {editingId ? 'Save Changes' : 'Publish Project'} ]
              </button>
            </div>
          </form>

          {/* Right Column: Active Documents */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="text-xs tracking-widest uppercase text-muted mb-2">
              Active Projects // ({projects.length})
            </div>

            {loading ? (
              <div className="text-xs text-muted uppercase tracking-widest animate-pulse">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="border border-dashed border-border/50 p-8 text-center text-xs text-muted">
                No projects found. Create your first project using the form on the left.
              </div>
            ) : (
              projects.map((p) => (
                <div
                  key={p._id}
                  className="border border-border/50 bg-[#050505] p-6 flex flex-col md:flex-row justify-between md:items-start gap-6 group hover:border-[#4ade80]/50 transition-colors"
                >
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-center gap-3 text-[10px] text-muted uppercase tracking-wider">
                      <span>No. {p.buildId}</span>
                      <span>•</span>
                      <span className={p.status === 'ACTIVE' || p.status === 'DEPLOYED' ? 'text-[#4ade80]' : ''}>{p.status}</span>
                      <span>•</span>
                      <span>{p.coordinates}</span>
                    </div>
                    <div className="text-base font-bold uppercase tracking-tight text-foreground">{p.title}</div>
                    <div className="text-xs text-muted line-clamp-2 leading-relaxed">{p.description}</div>
                  </div>

                  <div className="flex items-center gap-4 text-xs tracking-wider shrink-0 mt-2 md:mt-0">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-muted hover:text-foreground transition-colors uppercase"
                    >
                      [Edit]
                    </button>
                    <button
                      onClick={() => p._id && handleDelete(p._id)}
                      className="text-red-500/70 hover:text-red-500 transition-colors uppercase"
                    >
                      [Delete]
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}