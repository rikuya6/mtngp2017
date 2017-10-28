desc 'babel-transpile'
task babel: :environment do
  application_dir = Dir.glob(Rails.root.join("app", "assets", "javascripts", "application", "*.js"))
  stage_dir = Dir.glob(Rails.root.join("app", "assets", "javascripts", "stage", "*", "*.js"))
  babel_transpile application_dir
  babel_transpile stage_dir
end

private

def babel_transpile(file_path_arr)
  file_path_arr.each do |file|
    data = File.read(file)
    File.write file, Babel::Transpiler.transform(data)["code"]
  end
end
