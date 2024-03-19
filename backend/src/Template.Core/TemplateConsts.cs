using Template.Debugging;

namespace Template
{
    public class TemplateConsts
    {
        public const string LocalizationSourceName = "Template";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "27f733b33b63410c92e9224108b58acb";
    }
}
