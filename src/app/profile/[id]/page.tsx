export default function UserProfile({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-2xl font-sans">Profile page
                <span className="text-red bg-orange-500 m-4 p-2 rounded-lg ">
                    {params.id}
                </span> </p>
        </div>
    )
} 