import Link from "next/link";

const CreateElection = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold">Create Election</h1>
        <p>Create a new election here.</p>
        <Link href="/elections/create/add" className="text-blue-500 hover:text-blue-700">
          Add Election
        </Link>
      </div>
    );
  };
  
  export default CreateElection;