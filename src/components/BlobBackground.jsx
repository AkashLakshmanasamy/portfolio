export default function BlobBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-bg-900">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-blob" />
            <div className="absolute top-[40%] right-[-10%] w-[35%] h-[35%] rounded-full bg-secondary/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-tertiary/20 blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '4s' }} />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
    );
}
